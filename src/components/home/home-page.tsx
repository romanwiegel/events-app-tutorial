import Link from "next/link";
import Image from "next/image";
import { EventLocation } from "@/libs/types/EventLocation.type";

export const HomePage = ({ data }: { data: EventLocation[] }) => {
  return (
    <div className="home_body">
      {data.map((ev: EventLocation) => (
        <Link className="card" key={ev.id} href={`/events/${ev.id}`}>
          <div className="image">
            <Image
              src={ev.image}
              alt={ev.title}
              width={600}
              height={400}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
