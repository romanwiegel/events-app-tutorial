import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { EventType } from "@/libs/types/Event.type";

// type Data = {
//   status?: number;
//   message: string;
// };

function buildPath() {
  return path.join(process.cwd(), "src", "data", "data.json");
}

function extractData(filePath: string) {
  const jsonData = fs.readFileSync(filePath, { encoding: "utf-8" });
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const filePath = buildPath();
  const { events_categories, all_events } = extractData(filePath);

  if (!all_events) {
    return res.status(404).json({
      status: 404,
      message: "No events found",
    });
  }

  if (method === "POST") {
    const { email, eventId, eventTitle } = req.body;
    console.log(req.body);

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    const newAllEvents = all_events.map((event: EventType) => {
      if (event.id === eventId) {
        if (event.emails_registered.includes(email)) {
          res
            .status(409)
            .json({ message: "This email has already been registered" });
          return event;
        }
        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        };
      }
      return event;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, all_events: newAllEvents })
    );

    res.status(200).json({
      message: `You have successfully registered to "${eventTitle}" with email: ${email}`,
    });
  }
}
