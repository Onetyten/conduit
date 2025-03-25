import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";

export async function GET() { // Or a different HTTP method like POST
  try {
    await mongoConnect();

    const services = await Service.find().select('user'); // Fetch only the 'user' field

    if (!services || services.length === 0) {
      return NextResponse.json({ message: 'No services found in the database.' });
    }

    console.log("--- User IDs in Services ---");
    services.forEach((service, index) => {
      if (service.user) {
        console.log(`Service ${index + 1}: User ID - ${service.user}`);
      } else {
        console.log(`Service ${index + 1}: User ID - NOT SET`);
      }
    });
    console.log("--- End of User IDs ---");

    return NextResponse.json({ message: 'Successfully logged user IDs.' });

  } catch (error) {
    console.error("Error fetching services and logging user IDs:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}