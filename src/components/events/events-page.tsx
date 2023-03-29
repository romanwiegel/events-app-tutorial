import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EventLocation } from "@/libs/types/EventLocation.type";

const AllEvents = ({ data }: { data: EventLocation[] }) => {
  return (
    <div className="events_page">
      {data?.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`} legacyBehavior>
          <a className="card">
            <Image
              src={ev.image}
              alt={ev.title}
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
            />
            <h2>{ev.title} </h2>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
