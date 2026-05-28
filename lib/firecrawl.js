import Firecrawl from "@mendable/firecrawl-js";

export async function scrapeProduct(url) {
  try {
    const apiKey = process.env.FIRECRAWL_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("FIRECRAWL_API_KEY is not configured.");
    }

    const firecrawl = new Firecrawl({
      apiKey,
    });

    const result = await firecrawl.v1.scrapeUrl(url, {
      formats: ["json"],
      jsonOptions: {
        prompt:
          "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
        schema: {
          type: "object",
          properties: {
            productName: { type: "string" },
            currentPrice: { type: "number" },
            currencyCode: { type: "string" },
            productImageUrl: { type: "string" },
          },
          required: ["productName", "currentPrice"],
        },
      },
    });

    if (!result.success) {
      throw new Error(result.error || "Failed to scrape product");
    }

    const extractedData = result.json || result.extract || result.data;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);

    if (error?.statusCode === 401 || /status code:\s*401/i.test(error?.message || "")) {
      throw new Error("Failed to scrape product: Firecrawl API key is missing or invalid.");
    }

    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
