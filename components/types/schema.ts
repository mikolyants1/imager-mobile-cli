import { z } from "zod";
import { authSchema } from "../schemas/authSchema";

export type TAuthSchema = z.infer<typeof authSchema>;