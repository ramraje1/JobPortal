import { Badge } from "@/components/ui/badge";

export default function Latestcard({ item }) {
  return (
    <>
      <div
        className="flex flex-col border border-gray-600 py-4 text-center rounded-md  shadow-md max-w-full 
      ">
        <h className="text-2xl font-semibold">{item.title}</h>
        <p className="text-sm text-gray-400 font-semibold">{item.location}</p>

        <p className="text-sm text-gray-400 font-semibold">
          {item.description}
        </p>

        <div className="pt-2">
          <Badge variant="outline" className="bg-red-400 text-white text-lg">
            {item.position}
          </Badge>
          <Badge variant="outline" className="bg-green-400 text-white text-lg">
            {item.jobTypes}
          </Badge>
          <Badge variant="outline" className="bg-yellow-400 text-white text-lg">
            {item.salary}
          </Badge>
        </div>
      </div>
    </>
  );
}
