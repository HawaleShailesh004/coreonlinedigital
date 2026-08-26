"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { InView } from "@/components/samples/InView";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleBadge } from "@/components/samples/SampleEyebrow";
import { Reveal } from "@/components/ui/Reveal";
import {
  getProduct,
  products,
  shipping,
  trader,
  type Product,
} from "@/lib/samples/trader";
import { traderMedia } from "@/lib/samples/media";

/**
 * Cart, shop grid and cart page for the trader sample.
 *
 * This is the one sample where the interaction *is* the pitch: the brief asks
 * for it to feel closest to a real, functioning store, because a working cart is
 * the thing the prospect is being sold. Filtering, cart maths, the free-shipping
 * threshold and checkout state are real — only payment and the order record are faked.
 *
 * State lives in a context because the cart count belongs in the nav while the
 * add buttons live on shop, PDP and home.
 */

type CartLine = { id: string; qty: number; variant?: string };

type Store = {
  lines: CartLine[];
  count: number;
  add: (id: string, variant?: string) => void;
  setQty: (id: string, qty: number, variant?: string) => void;
  clear: () => void;
};

const StoreContext = createContext<Store | null>(null);

export function useTraderStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Trader store components need <StoreProvider>.");
  return store;
}

/** @deprecated Prefer useTraderStore */
export const useStore = useTraderStore;

const BASE = "/samples/trader";
const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export function productPhoto(product: Product, offset = 0) {
  const index = products.findIndex((item) => item.id === product.id);
  const photos = traderMedia.products;
  const i = (Math.max(index, 0) + offset) % photos.length;
  return photos[i]!;
}

function lineKey(line: CartLine) {
  return line.variant ? `${line.id}::${line.variant}` : line.id;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  function add(id: string, variant?: string) {
    setLines((current) => {
      const existing = current.find(
        (line) => line.id === id && line.variant === variant,
      );
      if (existing) {
        return current.map((line) =>
          line.id === id && line.variant === variant
            ? { ...line, qty: line.qty + 1 }
            : line,
        );
      }
      return [...current, { id, qty: 1, variant }];
    });
  }

  function setQty(id: string, qty: number, variant?: string) {
    setLines((current) =>
      qty <= 0
        ? current.filter(
            (line) => !(line.id === id && line.variant === variant),
          )
        : current.map((line) =>
            line.id === id && line.variant === variant
              ? { ...line, qty }
              : line,
          ),
    );
  }

  function clear() {
    setLines([]);
  }

  return (
    <StoreContext.Provider value={{ lines, count, add, setQty, clear }}>
      {children}
    </StoreContext.Provider>
  );
}

/** Cart control for the nav — links to the full cart page. */
export function CartButton() {
  const { count } = useTraderStore();
  const [bump, setBump] = useState(false);
  const previous = useRef(count);

  useEffect(() => {
    const grew = count > previous.current;
    previous.current = count;
    if (!grew) return;

    setBump(true);
    const timer = setTimeout(() => setBump(false), 200);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <Link
      href={`${BASE}/cart`}
      className="relative flex size-9 items-center justify-center text-[var(--s-ink)] transition-opacity hover:opacity-70"
      aria-label={
        count === 0 ? "Cart, empty" : `Cart, ${count} item${count > 1 ? "s" : ""}`
      }
    >
      <svg
        viewBox="0 0 20 20"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 5h2l1.6 8.2a1 1 0 0 0 1 .8h6.9a1 1 0 0 0 1-.8L17 7H5.4" />
        <circle cx="8" cy="17" r="1" />
        <circle cx="14.5" cy="17" r="1" />
      </svg>
      {count > 0 && (
        <span
          className={cn(
            "absolute -right-0.5 -top-0.5 flex min-w-[1.15rem] items-center justify-center rounded-full bg-[var(--s-primary)] px-1 py-0.5 text-[0.625rem] font-semibold leading-none text-[var(--s-on-primary)]",
            bump && "s-cart-bump",
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export function ShopGrid() {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Newest");

  const visible = useMemo(() => {
    const filtered =
      category === "All"
        ? products
        : products.filter((product) => product.category === category);

    if (sort === "Price: low to high") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sort === "Price: high to low") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [category, sort]);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[var(--s-hair)] py-3.5">
        <div
          className="flex flex-wrap gap-1"
          role="group"
          aria-label="Filter by category"
        >
          {trader.shop.categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
              className={cn(
                "px-3 py-1.5 text-[0.8125rem] transition-colors",
                category === option
                  ? "bg-[var(--s-ink)] text-[var(--s-bg)]"
                  : "text-[var(--s-grey)] hover:text-[var(--s-ink)]",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-[0.8125rem] text-[var(--s-grey)]">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="border border-[var(--s-hair)] bg-[var(--s-bg)] px-2.5 py-1.5 text-[0.8125rem] text-[var(--s-ink)] outline-none focus:border-[var(--s-primary)]"
          >
            {trader.shop.sorts.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} products shown
      </p>
    </>
  );
}

/** First 4–6 products for the home teaser. */
export function FeaturedGrid({ limit = 4 }: { limit?: number }) {
  const featured = products.slice(0, limit);

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
      {featured.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "grid" | "teaser";
}) {
  const { add } = useTraderStore();
  const [added, setAdded] = useState(false);
  const photo = productPhoto(product);
  const soldOut = product.stock === "out";
  const href = `${BASE}/shop/${product.id}`;

  function onAdd(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="s-zoom group flex h-full flex-col">
      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden bg-[var(--s-surface)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              variant === "teaser"
                ? "(min-width: 1024px) 23vw, 47vw"
                : "(min-width: 1024px) 23vw, 47vw"
            }
            className={cn("object-cover", soldOut && "opacity-55 saturate-50")}
          />
          {product.was && !soldOut && (
            <SampleBadge className="s-badge-pulse absolute left-3 top-3">
              Sale
            </SampleBadge>
          )}
          {soldOut && (
            <span className="absolute left-3 top-3 bg-[var(--s-ink)] px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--s-bg)]">
              Sold out
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={href} className="block">
          <h3 className="s-display text-[0.9375rem] font-semibold leading-snug transition-opacity group-hover:opacity-70">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-[var(--s-grey)]">
          {product.blurb}
        </p>
        {product.variants && (
          <p className="mt-1.5 text-[0.75rem] text-[var(--s-grey)]">
            {product.variants.join(", ")}
          </p>
        )}

        <div className="mt-auto pt-4">
          <p className="flex items-baseline gap-2">
            <span className="s-display text-[1.0625rem] font-semibold tabular-nums">
              {rupees(product.price)}
            </span>
            {product.was && (
              <span className="text-[0.8125rem] text-[var(--s-grey)] line-through tabular-nums">
                {rupees(product.was)}
              </span>
            )}
          </p>

          {product.stock === "low" && (
            <p className="mt-2 text-[0.75rem] font-medium text-[var(--s-accent)]">
              Only a few left
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {soldOut ? (
          <SampleButton
            data-open-chat
            variant="outline"
            size="sm"
            className="w-full"
          >
            Notify me
          </SampleButton>
        ) : (
          <SampleButton
            type="button"
            onClick={onAdd}
            variant={added ? "accent" : "primary"}
            size="sm"
            className="w-full"
          >
            {added ? "Added ✓" : "Add to cart"}
          </SampleButton>
        )}
      </div>
    </article>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useTraderStore();
  const [added, setAdded] = useState(false);
  const [selected, setSelected] = useState(product.variants?.[0] ?? "");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const soldOut = product.stock === "out";

  const gallery = [
    productPhoto(product, 0),
    productPhoto(product, 1),
    productPhoto(product, 2),
  ];

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category || item.stock !== "out"),
    )
    .slice(0, 4);

  function onAdd() {
    if (soldOut) return;
    add(product.id, selected || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <div className="relative aspect-square overflow-hidden bg-[var(--s-surface)]">
            <Image
              src={gallery[galleryIndex]!.src}
              alt={gallery[galleryIndex]!.alt}
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className={cn("object-cover", soldOut && "opacity-55 saturate-50")}
            />
            {product.was && !soldOut && (
              <SampleBadge className="s-badge-pulse absolute left-4 top-4">
                Sale
              </SampleBadge>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {gallery.map((shot, index) => (
              <button
                key={`${shot.src}-${index}`}
                type="button"
                onClick={() => setGalleryIndex(index)}
                aria-label={`View photo ${index + 1}`}
                aria-pressed={galleryIndex === index}
                className={cn(
                  "relative aspect-square overflow-hidden bg-[var(--s-surface)]",
                  galleryIndex === index
                    ? "ring-2 ring-[var(--s-ink)] ring-offset-2"
                    : "opacity-80 hover:opacity-100",
                )}
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-[var(--s-grey)]">
            {product.category}
          </p>
          <h1 className="s-display mt-2 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.125rem]">
            {product.name}
          </h1>

          <p className="mt-4 flex items-baseline gap-2">
            <span className="s-display text-[1.375rem] font-semibold tabular-nums">
              {rupees(product.price)}
            </span>
            {product.was && (
              <span className="text-[0.9375rem] text-[var(--s-grey)] line-through tabular-nums">
                {rupees(product.was)}
              </span>
            )}
          </p>

          {product.stock === "low" && (
            <p className="mt-2 text-[0.8125rem] font-medium text-[var(--s-accent)]">
              Only a few left
            </p>
          )}
          {soldOut && (
            <p className="mt-2 text-[0.8125rem] font-medium text-[var(--s-grey)]">
              Sold out — restocking in about two weeks
            </p>
          )}

          <p className="mt-6 max-w-md leading-[1.75] text-[var(--s-grey)]">
            {product.description}
          </p>

          {product.variants && product.variants.length > 0 && !soldOut && (
            <div className="mt-8">
              <label
                htmlFor="product-variant"
                className="text-[0.8125rem] font-medium"
              >
                Options
              </label>
              <select
                id="product-variant"
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                className="mt-2 w-full max-w-xs border border-[var(--s-hair)] bg-[var(--s-bg)] px-3 py-2.5 text-[0.875rem] outline-none focus:border-[var(--s-primary)]"
              >
                {product.variants.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {soldOut ? (
              <SampleButton data-open-chat variant="outline">
                Notify me when back
              </SampleButton>
            ) : (
              <SampleButton
                type="button"
                onClick={onAdd}
                variant={added ? "accent" : "primary"}
              >
                {added ? "Added ✓" : "Add to cart"}
              </SampleButton>
            )}
            <SampleButton data-open-chat variant="outline">
              Ask about this product
            </SampleButton>
          </div>

          <ul className="mt-8 space-y-2 text-[0.8125rem] text-[var(--s-grey)]">
            <li>{shipping.dispatch}</li>
            <li>
              Free shipping over {rupees(shipping.freeOver)}; otherwise{" "}
              {rupees(shipping.flatRate)}.
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-[var(--s-hair)] pt-14">
          <h2 className="s-display text-[1.25rem] font-semibold tracking-[-0.02em]">
            You may also like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export function CartPage() {
  const { lines, setQty, clear } = useTraderStore();
  const [placed, setPlaced] = useState(false);
  const [receipt, setReceipt] = useState<{ subtotal: number; freight: number } | null>(
    null,
  );

  const subtotal = lines.reduce((sum, line) => {
    const product = getProduct(line.id);
    return sum + (product?.price ?? 0) * line.qty;
  }, 0);
  const freight =
    subtotal === 0 || subtotal >= shipping.freeOver ? 0 : shipping.flatRate;
  const shortfall = shipping.freeOver - subtotal;

  function checkout() {
    setReceipt({ subtotal, freight });
    clear();
    setPlaced(true);
  }

  if (placed && receipt) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center bg-[var(--s-primary)]/12">
          <svg
            viewBox="0 0 16 16"
            className="size-6 text-[var(--s-primary)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8.5 6.2 11.7 13 5" />
          </svg>
        </div>
        <h1 className="s-display mt-6 text-[1.75rem] font-semibold">
          {trader.cart.successTitle}
        </h1>
        <p className="mt-3 leading-[1.7] text-[var(--s-grey)]">
          {trader.cart.successBody}
        </p>
        <p className="mt-6 text-[0.8125rem] text-[var(--s-grey)]">
          {trader.cart.note}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SampleButton href={`${BASE}/shop`}>
            {trader.cart.continueShopping}
          </SampleButton>
          <SampleButton
            type="button"
            variant="outline"
            onClick={() => {
              setPlaced(false);
              setReceipt(null);
            }}
          >
            Back to cart
          </SampleButton>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <h1 className="s-display text-[1.75rem] font-semibold">
          {trader.cart.title}
        </h1>
        <p className="mt-4 text-[0.9375rem] font-medium">{trader.cart.empty}</p>
        <p className="mt-2 text-[0.875rem] text-[var(--s-grey)]">
          {trader.cart.emptyHint}
        </p>
        <SampleButton href={`${BASE}/shop`} className="mt-8">
          {trader.cart.continueShopping}
        </SampleButton>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div>
        <h1 className="s-display text-[1.75rem] font-semibold tracking-[-0.02em]">
          {trader.cart.title}
        </h1>
        <ul className="mt-8 divide-y divide-[var(--s-hair)] border-y border-[var(--s-hair)]">
          {lines.map((line) => {
            const product = getProduct(line.id);
            if (!product) return null;
            const photo = productPhoto(product);

            return (
              <li key={lineKey(line)} className="flex gap-4 py-5 sm:gap-5">
                <Link
                  href={`${BASE}/shop/${product.id}`}
                  className="relative size-20 shrink-0 overflow-hidden bg-[var(--s-surface)] sm:size-24"
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`${BASE}/shop/${product.id}`}
                    className="text-[0.9375rem] font-medium leading-snug hover:opacity-70"
                  >
                    {product.name}
                  </Link>
                  {line.variant && (
                    <p className="mt-1 text-[0.8125rem] text-[var(--s-grey)]">
                      {line.variant}
                    </p>
                  )}
                  <p className="mt-1 text-[0.8125rem] tabular-nums text-[var(--s-grey)]">
                    {rupees(product.price)}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-[var(--s-hair)]">
                      <button
                        type="button"
                        onClick={() =>
                          setQty(line.id, line.qty - 1, line.variant)
                        }
                        aria-label={`Decrease ${product.name}`}
                        className="px-2.5 py-1 text-sm text-[var(--s-grey)] hover:text-[var(--s-ink)]"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-[0.8125rem] tabular-nums">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQty(line.id, line.qty + 1, line.variant)
                        }
                        aria-label={`Increase ${product.name}`}
                        className="px-2.5 py-1 text-sm text-[var(--s-grey)] hover:text-[var(--s-ink)]"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQty(line.id, 0, line.variant)}
                      className="text-[0.75rem] text-[var(--s-grey)] underline underline-offset-4 hover:text-[var(--s-ink)]"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p className="s-display shrink-0 text-[0.9375rem] font-semibold tabular-nums">
                  {rupees(product.price * line.qty)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="h-fit border border-[var(--s-hair)] bg-[var(--s-surface)] p-6 lg:sticky lg:top-24">
        <h2 className="s-display text-[1rem] font-semibold">Order summary</h2>

        {freight > 0 && (
          <p className="mt-4 bg-[var(--s-bg)] px-3 py-2 text-[0.75rem] text-[var(--s-grey)]">
            Add {rupees(shortfall)} more for free shipping.
          </p>
        )}

        <dl className="mt-5 space-y-2 text-[0.875rem]">
          <div className="flex justify-between">
            <dt className="text-[var(--s-grey)]">{trader.cart.subtotal}</dt>
            <dd className="tabular-nums">{rupees(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--s-grey)]">{trader.cart.shippingLabel}</dt>
            <dd className="tabular-nums">
              {freight === 0 ? trader.cart.freeShipping : rupees(freight)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-[var(--s-hair)] pt-3 text-[1rem] font-semibold">
            <dt>{trader.cart.total}</dt>
            <dd className="tabular-nums">{rupees(subtotal + freight)}</dd>
          </div>
        </dl>

        <SampleButton
          type="button"
          onClick={checkout}
          className="mt-6 w-full"
        >
          {trader.cart.checkout} · {rupees(subtotal + freight)}
        </SampleButton>
        <p className="mt-3 text-center text-[0.6875rem] text-[var(--s-grey)]">
          {trader.cart.note}
        </p>
        <SampleButton
          href={`${BASE}/shop`}
          variant="quiet"
          size="sm"
          className="mt-4 w-full"
        >
          {trader.cart.continueShopping}
        </SampleButton>
      </aside>
    </div>
  );
}

/** Horizontal post-order automation steps — lights up on scroll. */
export function AutomationFlowDiagram() {
  return (
    <ol className="mt-12 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-5">
      {trader.flow.steps.map((step, index) => (
        <li key={step.title} className="relative">
          <div className="flex items-center gap-2">
            <InView
              as="span"
              delay={index * 140}
              className="s-pop flex size-7 shrink-0 items-center justify-center bg-[var(--s-primary)] text-[0.6875rem] font-semibold text-[var(--s-on-primary)]"
            >
              {index + 1}
            </InView>
            {index < trader.flow.steps.length - 1 && (
              <InView
                as="span"
                delay={index * 140 + 120}
                className="s-connector hidden h-px flex-1 bg-[var(--s-hair)] lg:block"
              />
            )}
          </div>

          <Reveal delay={index * 140 + 60}>
            <p className="s-mono mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--s-accent)]">
              {step.timing}
            </p>
            <h3 className="s-display mt-1.5 text-[0.9375rem] font-semibold">
              {step.title}
            </h3>
            <p className="mt-2 text-[0.875rem] leading-[1.65] text-[var(--s-grey)]">
              {step.body}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function FaqAccordion({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <dl className="divide-y divide-[var(--s-hair)] border-y border-[var(--s-hair)]">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.q}>
            <dt>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="s-display text-[0.9375rem] font-semibold">
                  {faq.q}
                </span>
                <span
                  className="text-[1.25rem] leading-none text-[var(--s-grey)]"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </dt>
            {isOpen && (
              <dd className="pb-5 max-w-xl text-[0.9375rem] leading-[1.7] text-[var(--s-grey)]">
                {faq.a}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}
