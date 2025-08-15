import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import fs from 'fs';
import { NextResponse } from "next/server";
import Profile from "@/models/profileSchema";
import bcrypt from 'bcrypt'



export async function POST() {
  try {
    await mongoConnect();
    await Service.deleteMany();
    await Profile.deleteMany()

    const profiles = await JSON.parse(fs.readFileSync('jsons/profiles.json','utf-8'))
    const services = JSON.parse(fs.readFileSync('jsons/service.json', 'utf-8'));

    if (!profiles || !services || profiles.length==0 || services.length == 0){
      console.log("Invalid JSON input")
      return NextResponse.json({message:"Invalid JSON input"},{status:401})
    }

    const createdServices = [];
    const createdProfiles =[]

    for (let i = 0; i < services.length; i++) {
      //create profile
      const profile = profiles[i]
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(profile.password,salt)
      const newProfile = await Profile.create({...profile,password:hashedPassword})
      createdProfiles.push(newProfile);

      //create corresponding service using profile id
      const serviceData = { ...services[i], serviceProviderId: newProfile._id};
      const newService = await Service.create(serviceData);
      createdServices.push(newService);
      console.log(`Created service ${i}:`, newService.title, 'with profile ', newProfile.firstName );
    }
    console.log("services seeding successful")
    return NextResponse.json({ message: 'Services seeded successfully', createdServices });

  } catch (error) {
     console.error("error seeding services", error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage  }, { status: 500 });
  }
}