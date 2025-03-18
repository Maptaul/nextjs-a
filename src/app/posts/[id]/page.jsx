export const getSinglePost = async (post_id) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post_id}`
  );
  const data = await res.json();
  return data;
};

export async function generateMetadata({ params }) {
  // read route params
  const id = (await params).id;

  // fetch data
  const singlePost = await getSinglePost(id);

  return {
    title: singlePost.title,
    description: singlePost.body,
  };
}

export default async function SinglePost({ params }) {
  const p = await params;
  const singlePost = await getSinglePost(p.id);
  return (
    <div className="max-w-md mx-auto mt-3 bg-gray-300 shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-2xl text-rose-500 font-bold mb-2">
          {singlePost.title}
        </h1>
        <p className="text-gray-700">{singlePost.body}</p>
      </div>
    </div>
  );
}
