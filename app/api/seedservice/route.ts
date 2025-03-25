import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import fs from 'fs';
import { NextResponse } from "next/server";
import Profile from "@/models/profileSchema"; // Assuming you have a Profile model

export async function GET() {
  try {
    await mongoConnect();
    await Service.deleteMany();
    const services = JSON.parse(fs.readFileSync('jsons/service.json', 'utf-8'));

    const profiles = await Profile.find();

    if (profiles.length === 0) {
      return NextResponse.json({ message: 'No profiles found in the database. Please seed profiles first.' }, { status: 400 });
    }

    const createdServices = [];
    for (let i = 0; i < services.length; i++) {
      if (i < profiles.length) {
        const serviceData = {
          ...services[i],
          profileId: profiles[i]._id,
          _id: undefined,
        };
        const newService = await Service.create(serviceData);
        createdServices.push(newService);
        console.log(`Created service ${i}:`, newService);


      } else {
        console.warn(`Warning: Skipping service at index ${i} because no corresponding profile found.`);
        break;
      }
    }

    return NextResponse.json({ message: 'Services seeded successfully', createdServices });

  } catch (error) {
    console.error("error seeding services", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}