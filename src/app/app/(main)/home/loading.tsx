export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="bg-primary w-screen h-52 py-5 px-2 space-y-5">
        <div className="h-16 w-full animate-pulse  bg-gray-400 rounded-full"></div>
        <div className="h-5 w-1/2 animate-pulse  bg-gray-400 rounded-full "></div>
        <div className="h-5 w-1/4 animate-pulse  bg-gray-400 rounded-full "></div>
      </div>
      <div className="space-y-5">
        <div className="h-10 w-1/2 animate-pulse mx-5 bg-gray-400 rounded-full "></div>{" "}
        <div className="h-5 w-1/2 animate-pulse mx-5 bg-gray-400 rounded-full "></div>{" "}
        <div className="h-5 w-1/4 animate-pulse mx-5 bg-gray-400 rounded-full "></div>{" "}
        <div className="h-5 w-1/4 animate-pulse mx-5 bg-gray-400 rounded-full "></div>
      </div>
    </div>
  );
}
