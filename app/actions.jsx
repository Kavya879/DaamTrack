"use server"
import { createClient } from "@/utils/supabase/server";
import { scrapeProduct } from "@/lib/firecrawl";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}

export async function addProduct(formData) {
   const url = formData.get("url");

  if (!url) {
    return { error: "URL is required" };
  }

  try {
      const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Not authenticated" };
    }

    const productData = await scrapeProduct(url);

     if (!productData.productName || !productData.currentPrice) {
      console.log(productData, "productData");
      return { error: "Could not extract product information from this URL" };
    }

     const newPrice = parseFloat(productData.currentPrice);
    const currency = productData.currencyCode || "USD";

    // If product exists
    const { data: existingProduct } = await supabase
      .from("products")
      .select("id, current_price")
      .eq("user_id", user.id)
      .eq("url", url)
      .single();
    
    //The !! is just a way to turn whatever existingProduct is into a clean true or false.
    const isUpdate = !!existingProduct; 

     // Upsert product (insert or update based on user_id + url)
    const { data: product, error } = await supabase
      .from("products")
      .upsert(
        {
          user_id: user.id,
          url,
          name: productData.productName,
          current_price: newPrice,
          currency: currency,
          image_url: productData.productImageUrl,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,url", // If there’s already a row where user_id AND url match, treat that as the same product.
          ignoreDuplicates: false, // If this were true, Supabase would skip the update.
        }
      )
      .select()
      .single();

      
      if (error) throw error;

      // Add to price history if it's a new product OR price changed
    const shouldAddHistory = !isUpdate || existingProduct.current_price !== newPrice;

     if (shouldAddHistory) {
      await supabase.from("price_history").insert({
        product_id: product.id,
        price: newPrice,
        currency: currency,
      });
    }

    revalidatePath("/");
    return {
      success: true,
      product,
      message: isUpdate
        ? "Product updated with latest price!"
        : "Product added successfully!",
    };


  } 
  catch (error) 
  {
    console.error("Add product error:", error);
    return { error: error.message || "Failed to  add product" };
  }
}