import { EventType } from "@/libs/types/Event.type";
import Image from "next/image";
import Link from "next/link";

const EventsPerCity = ({
  data,
  pageName,
}: {
  data: EventType[];
  pageName: string;
}) => {
  return (
    <div className="cat_events">
      <h1> Events in {pageName.toUpperCase()} </h1>

      <div className="content">
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} legacyBehavior>
            <a className="card">
              <Image
                width={300}
                height={300}
                alt={ev.title}
                src={ev.image}
                style={{ objectFit: "cover" }}
              />
              <h2> {ev.title} </h2>
              <p> {ev.description} </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsPerCity;
