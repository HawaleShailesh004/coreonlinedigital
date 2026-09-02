export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<"name" | "businessType" | "otherBusinessType" | "phone", string>
  >;
  values?: {
    name: string;
    businessType: string;
    otherBusinessType: string;
    phone: string;
  };
};

export const initialContactState: ContactState = { status: "idle" };
