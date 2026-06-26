import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog Content Collection
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Camila Verdejo'),
    category: z.enum(['Manual', 'Alimentación', 'Problemas', 'Cosecha']),
    difficulty: z.enum(['Principiante', 'Intermedio', 'Avanzado']).default('Principiante'),
    readingTime: z.string().optional(),
    heroImage: z.string().optional()
  })
});

// Alimentos (compostable lookup) Data Collection
const alimentos = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/alimentos' }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    status: z.enum(['safe', 'warning', 'danger']),
    chileanContext: z.string(),
    instructions: z.string()
  })
});

export const collections = { blog, alimentos };
