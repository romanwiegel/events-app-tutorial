import AllEvents from "@/components/events/events-page";
import { EventLocation } from "@/libs/types/EventLocation.type";

const EventsPage = ({ data }: { data: EventLocation[] }) => {
  return <AllEvents data={data} />;
};
export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import("../../data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
