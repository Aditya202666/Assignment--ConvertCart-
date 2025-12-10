import z from "zod";


const optionalNumberFromQuery = z.preprocess((val)=>{
    if(val === undefined || val === null || val === ""){
        return undefined
    }
    const num = Number(val)

    return isNaN(num) ? val : num   
    
},
z.number().min(0, { message: "Price cannot be negative."})
)


export const dishesSearchValidator = z
  .object({
    name: z.string({ message: "Dish name is required" }),
    minPrice: optionalNumberFromQuery,
    maxPrice: optionalNumberFromQuery,
  })
  .refine(
    ({ minPrice, maxPrice }) =>
      minPrice === undefined || maxPrice === undefined || minPrice <= maxPrice,
    { message: "Min price must be less than or equal to max price" }
  );
