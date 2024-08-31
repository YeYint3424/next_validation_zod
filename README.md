# NextJS Form Validation Example with ZOD
Check out the accompanying video [NextJS Form Validation Example with Zod](https://youtu.be/fYpvh9ccul0) on Coding Money youtube channel.

# Zod Schema Examples

Here are some common types and how you can define schemas for them:

## 1. Number

```
const numberSchema = z.number().min(1).max(100); // A number between 1 and 100
```

## 2. Boolean:

```
const booleanSchema = z.boolean(); // A boolean value (true or false)
```
## 3. Date:

```
const dateSchema = z.date().min(new Date('2023-01-01')); // A date after January 1st, 2023
```
## 4. Array:

```
const arraySchema = z.array(z.string()); // An array of strings
const numberArraySchema = z.array(z.number()).min(3); // An array of numbers with at least 3 items
```
## 5. Enum:
```
const roleEnum = z.enum(["Admin", "User", "Guest"]); // Enum for specific roles
```
## 6. Object:

```
const objectSchema = z.object({
  name: z.string(),
  age: z.number().min(18), // Nested validation within an object
});
```
## 7. Nullable and Optional:

```
const nullableSchema = z.string().nullable(); // Can be a string or null
const optionalSchema = z.string().optional(); // Can be a string or undefined
```

## 8. Custom Validation:
You can add custom validations using .refine():


```
const passwordSchema = z.string().refine((val) => val.length >= 6, {
  message: "Password must be at least 6 characters long",
});
```

## 9. Union Types:

```
const stringOrNumber = z.union([z.string(), z.number()]); // Can be a string or a number
```
## 10. Transformations:
Zod also allows you to transform values:


```
const transformSchema = z.string().transform((val) => val.toUpperCase()); // Converts string to uppercase

```

## 11. Chaining Validators:
You can chain multiple validators:


```
const advancedSchema = z.string().min(5).max(10).regex(/^[a-zA-Z]+$/); // String between 5 and 10 characters containing only letters
```
References:
You can find more types and validations in the Zod documentation.
