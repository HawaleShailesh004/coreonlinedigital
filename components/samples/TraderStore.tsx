"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import { SampleButton } from "@/components/samples/SampleButton";
import { SampleBadge } from "@/components/samples/SampleEyebrow";
import { products, shipping, trader, type Product } from "@/lib/samples/trader";
import { traderMedia } from "@/lib/samples/media";

/**
 * Cart, shop grid and cart drawer for the trader sample.
 *
 * This is the one sample where the interaction *is* the pitch: the brief asks
 * for it to feel closest to a real, functioning store, because a working cart is
 * the thing the prospect is being sold. So the filtering, the cart maths, the
 * free-shipping threshold and the checkout state are all real - only the payment
 * and the order record are faked.
 *
 * State lives in a context because the cart count belongs in the nav while the
 * add buttons live further down the page.
 */

type CartLine = { id: string; qty: number };

type Store = {
  lines: CartLine[];
  count: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const StoreContext = createContext<Store | null>(null);

function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Trader store components need <StoreProvider>.");
  return store;
}

const byId = new Map(products.map((product) => [product.id, product]));
const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  function add(id: string) {
    setLines((current) => {
      const existing = current.find((line) => line.id === id);
      if (existing) {
        return current.map((line) =>
          line.id === id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { id, qty: 1 }];
    });
  }

  function setQty(id: string, qty: number) {
    setLines((current) =>
      qty <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) => (line.id === id ? { ...line, qty } : line)),
    );
  }

  return (
    <StoreContext.Provider
      value={{ lines, count, add, setQty, open, setOpen }}
    >
      {children}
      <CartDrawer />
    </StoreContext.Provider>
  );
}

/** Cart control for the nav. Passed to SampleNav's `extra` slot. */
export function CartButton() {
  const { count, setOpen } = useStore();
  const [bump, setBump] = useState(false);
  const previous = useRef(count);

  // Short bump on increment - the feedback pattern every shopper already knows.
  useEffect(() => {
    const grew = count > previous.current;
    previous.current = count;
    if (!grew) return;

    setBump(true);
    const timer = setTimeout(() => setBump(false), 200);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
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
    </button>
  );
}

export function ShopGrid() {
  const { add } = useStore();
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("Newest");

  const visible = useMemo(() => {
    const filtered =
      category === "All"
        ? products
        : products.filter((product) => product.category === category);

    // "Newest" is the catalogue's own order, so it needs no comparator.
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
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by category">
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
          <ProductCard key={product.id} product={product} onAdd={add} />
        ))}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} products shown
      </p>
    </>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);
  const index = products.indexOf(product);
  const photo = traderMedia.products[index]!;
  const soldOut = product.stock === "out";

  function add() {
    onAdd(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="s-zoom group flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden bg-[var(--s-surface)]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 23vw, 47vw"
          className={cn("object-cover", soldOut && "opacity-55 saturate-50")}
        />
        {/* Reserved for genuinely reduced items, per the brief - a badge that
            pulses on everything is decoration, not urgency. */}
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

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="s-display text-[0.9375rem] font-semibold leading-snug">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[0.8125rem] leading-[1.6] text-[var(--s-grey)]">
          {product.blurb}
        </p>
        {product.variants && (
          <p className="mt-1.5 text-[0.75rem] text-[var(--s-grey)]">
            {product.variants}
          </p>
        )}

        <div className="mt-auto pt-4">
          {/* Price block sits above the button on every card, so the column of
              numbers stays scannable regardless of how long a name runs. */}
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
            onClick={add}
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

function CartDrawer() {
  const { lines, open, setOpen, setQty } = useStore();
  const [placed, setPlaced] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const subtotal = lines.reduce(
    (sum, line) => sum + (byId.get(line.id)?.price ?? 0) * line.qty,
    0,
  );
  const freight =
    subtotal === 0 || subtotal >= shipping.freeOver ? 0 : shipping.flatRate;
  const shortfall = shipping.freeOver - subtotal;

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[70] bg-[#1a1a1a]/40 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-label={trader.cart.title}
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-[24rem] flex-col border-l border-[var(--s-hair)] bg-[var(--s-bg)] transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-[var(--s-hair)] px-5 py-4">
          <p className="s-display text-[0.9375rem] font-semibold">
            {trader.cart.title}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            tabIndex={open ? 0 : -1}
            className="-mr-1 flex size-8 items-center justify-center text-[var(--s-grey)] transition-opacity hover:opacity-60"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </header>

        {placed ? (
          <div className="flex flex-1 flex-col justify-center px-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--s-primary)]/12">
              <svg
                viewBox="0 0 16 16"
                className="size-5 text-[var(--s-primary)]"
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
            <p className="s-display mt-5 text-lg font-semibold">
              {trader.cart.successTitle}
            </p>
            <p className="mt-2.5 text-[0.875rem] leading-[1.7] text-[var(--s-grey)]">
              {trader.cart.successBody}
            </p>
            <p className="mt-6 text-[0.75rem] text-[var(--s-grey)]">
              {trader.cart.note}
            </p>
            <button
              type="button"
              onClick={() => setPlaced(false)}
              className="mx-auto mt-6 text-sm text-[var(--s-primary)] underline underline-offset-4"
            >
              Back to the shop
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col justify-center px-6 text-center">
            <p className="s-display text-[0.9375rem] font-semibold">
              {trader.cart.empty}
            </p>
            <p className="mt-2 text-[0.875rem] text-[var(--s-grey)]">
              {trader.cart.emptyHint}
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[var(--s-hair)] overflow-y-auto px-5">
              {lines.map((line) => {
                const product = byId.get(line.id);
                if (!product) return null;
                const photo = traderMedia.products[products.indexOf(product)]!;

                return (
                  <li key={line.id} className="flex gap-3.5 py-4">
                    <div className="relative size-16 shrink-0 overflow-hidden bg-[var(--s-surface)]">
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[0.8125rem] font-medium leading-snug">
                        {product.name}
                      </p>
                      <p className="mt-1 text-[0.8125rem] tabular-nums text-[var(--s-grey)]">
                        {rupees(product.price)}
                      </p>

                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex items-center border border-[var(--s-hair)]">
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty - 1)}
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
                            onClick={() => setQty(line.id, line.qty + 1)}
                            aria-label={`Increase ${product.name}`}
                            className="px-2.5 py-1 text-sm text-[var(--s-grey)] hover:text-[var(--s-ink)]"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setQty(line.id, 0)}
                          className="text-[0.75rem] text-[var(--s-grey)] underline underline-offset-4 hover:text-[var(--s-ink)]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="s-display shrink-0 text-[0.875rem] font-semibold tabular-nums">
                      {rupees(product.price * line.qty)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-[var(--s-hair)] px-5 py-4">
              {freight > 0 && (
                <p className="mb-3 bg-[var(--s-surface)] px-3 py-2 text-[0.75rem] text-[var(--s-grey)]">
                  Add {rupees(shortfall)} more for free shipping.
                </p>
              )}

              <dl className="space-y-1.5 text-[0.8125rem]">
                <div className="flex justify-between">
                  <dt className="text-[var(--s-grey)]">
                    {trader.cart.subtotal}
                  </dt>
                  <dd className="tabular-nums">{rupees(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--s-grey)]">
                    {trader.cart.shippingLabel}
                  </dt>
                  <dd className="tabular-nums">
                    {freight === 0 ? trader.cart.freeShipping : rupees(freight)}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-[var(--s-hair)] pt-2.5 text-[0.9375rem] font-semibold">
                  <dt>{trader.cart.total}</dt>
                  <dd className="tabular-nums">{rupees(subtotal + freight)}</dd>
                </div>
              </dl>

              <SampleButton
                type="button"
                onClick={() => setPlaced(true)}
                className="mt-4 w-full"
              >
                {trader.cart.checkout} · {rupees(subtotal + freight)}
              </SampleButton>
              <p className="mt-2.5 text-center text-[0.6875rem] text-[var(--s-grey)]">
                {trader.cart.note}
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
