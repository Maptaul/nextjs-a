import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import MealSearchInput from "./components/MealSearchInput";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "All Meals",
  description: "Meals loaded from MealDB API",
};

export default async function MealsPage({ searchParams }) {
  const query = await searchParams;

  const fetchMeals = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.search}`
      );
      const data = await res.json();
      //   setMeals(data?.meals || []);
      return data.meals;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const meals = await fetchMeals();

  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center ">All Meals</h1>
      <div className="flex justify-center my-8">
        <MealSearchInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {meals?.map((singleMeal) => {
          return (
            <div
              key={singleMeal?.idMeal}
              className={`bg-white shadow-md rounded-lg overflow-hidden ${roboto.className}`}
            >
              <Image
                src={singleMeal?.strMealThumb}
                width={400}
                height={400}
                alt={singleMeal?.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">
                  {singleMeal?.strMeal}
                </h2>
                <p className="text-gray-700 text-base mb-4">
                  {singleMeal?.strInstructions.substring(0, 100)}...
                </p>
                <Link href={`/meals/${singleMeal.idMeal}`}>Details</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
