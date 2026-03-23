import { z } from 'zod';
import { ITEM_CATEGORIES } from './constants.ts';
import { ItemSortColumn, SortDirection } from './types.ts';

const AutoTransmissionSchema = z.enum(['automatic', 'manual']);

export const AutoItemParamsSchema = z.strictObject({
  brand: z.string().optional(),
  model: z.string().optional(),
  yearOfManufacture: z.number().int().nonnegative().optional(),
  transmission: AutoTransmissionSchema.optional(),
  mileage: z.number().nonnegative().optional(),
  enginePower: z.number().int().nonnegative().optional(),
});

const RealEstateTypeSchema = z.enum(['flat', 'house', 'room']);

export const RealEstateItemParamsSchema = z.strictObject({
  type: RealEstateTypeSchema.optional(),
  address: z.string().optional(),
  area: z.number().nonnegative().optional(),
  floor: z.number().int().nonnegative().optional(),
});

const ElectronicsTypeSchema = z.enum(['phone', 'laptop', 'misc']);
const ElectronicsConditionSchema = z.enum(['new', 'used']);

export const ElectronicsEstateItemParamsSchema = z.strictObject({
  type: ElectronicsTypeSchema.optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  condition: ElectronicsConditionSchema.optional(),
  color: z.string().optional(),
});

const CategorySchema = z.enum(Object.values(ITEM_CATEGORIES));

export const ItemsGetInQuerySchema = z.object({
  q: z.string().trim().optional().default(''),
  limit: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().optional().default(10)),
  skip: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().min(0).optional().default(0)),
  categories: z
    .string()
    .optional()
    .transform(val => (val ? val.split(',').map(s => s.trim()) : undefined))
    .pipe(z.array(CategorySchema).optional()),
  needsRevision: z
    .string()
    .optional()
    .transform(val => {
      if (!val) return undefined;
      return val === 'true' || val === '1';
    })
    .pipe(z.boolean().optional().default(false)),
  sortColumn: z.enum<ItemSortColumn[]>(['title', 'createdAt', 'price']).optional(),
  sortDirection: z.enum<SortDirection[]>(['asc', 'desc']).optional(),
});

export const ItemUpdateInSchema = z
  .object({
    category: CategorySchema,
    title: z.string(),
    description: z.string().optional(),
    price: z.number().min(0),
  })
  .and(
    z.discriminatedUnion('category', [
      z.object({
        category: z.literal(ITEM_CATEGORIES.AUTO),
        params: AutoItemParamsSchema.partial(),
      }),
      z.object({
        category: z.literal(ITEM_CATEGORIES.REAL_ESTATE),
        params: RealEstateItemParamsSchema.partial(),
      }),
      z.object({
        category: z.literal(ITEM_CATEGORIES.ELECTRONICS),
        params: ElectronicsEstateItemParamsSchema.partial(),
      }),
    ]),
  );
