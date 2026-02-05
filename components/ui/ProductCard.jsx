"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Trash2,
  TrendingDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import PriceChart from "./PriceChart";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);
    const result = await deleteProduct(product.id);
    setDeleting(false);
  };

  return (
    <Card className="border border-slate-200 bg-white transition hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg border border-slate-200"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-slate-900 line-clamp-2 mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-semibold text-slate-900">
                {product.currency} {product.current_price}
              </span>

              <Badge
                variant="secondary"
                className="gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <TrendingDown className="w-3 h-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="gap-1 text-slate-700"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide chart
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show chart
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-1 text-slate-700"
          >
            <Link
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              View product
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto text-slate-500 hover:text-red-600 hover:bg-red-50 gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </CardContent>

      {showChart && (
        <CardFooter className="pt-0 border-t border-slate-100">
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
}
