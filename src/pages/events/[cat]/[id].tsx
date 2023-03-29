import SingleEvent from "@/components/events/single-event";
import { EventType } from "@/libs/types/Event.type";

const EventPage = ({ data }: { data: EventType }) => {
  return <SingleEvent data={data} />;
};

export default EventPage;

export async function getStaticPaths() {
  const { all_events } = await import("../../../data/data.json");

  const allPaths = all_events.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context: {
  params: { cat: string; id: string; title: string };
}) {
  const id = context.params.id;
  const { all_events } = await import("../../../data/data.json");
  const eventData = all_events.find((ev) => ev.id === id);

  return {
    props: { data: eventData },
  };
}
