import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const client = hc<AppType>(APP_URL)