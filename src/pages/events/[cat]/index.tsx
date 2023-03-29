import EventsPerCity from "@/components/events/events-per-city";
import { EventType } from "@/libs/types/Event.type";

const EventsCatPage = ({
  data,
  pageName,
}: {
  data: EventType[];
  pageName: string;
}) => {
  return <EventsPerCity data={data} pageName={pageName} />;
};
export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("../../../data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: { cat: ev.id.toString() },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { cat: string } }) {
  const id = context?.params.cat;
  const { all_events } = await import("../../../data/data.json");
  const data = all_events.filter((ev) => ev.city === id);
  return {
    props: {
      data,
      pageName: id,
    },
  };
}
