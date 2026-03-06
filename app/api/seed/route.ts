import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import fs from 'fs';
import { NextResponse } from "next/server";
import Profile from "@/models/profileSchema";
import bcrypt from 'bcrypt'
import Review from "@/models/reviewSchema";

const generatePhoneNumber = ()=>{
  const prefixes = ['80','81','70','71','90','91']
  const prefix = prefixes[Math.floor(Math.random()*prefixes.length)]
  const remaining = Math.floor(Math.random()*100000000).toString().padStart(8,'5')
  const phone = prefix+remaining
  return phone
}

export async function POST() {
  try {
    await mongoConnect();
    await Service.deleteMany();
    await Profile.deleteMany()
    await Review.deleteMany

    const profiles = await JSON.parse(fs.readFileSync('jsons/profiles.json','utf-8'))
    const services = JSON.parse(fs.readFileSync('jsons/service.json', 'utf-8'));
    

    if (!profiles || !services || profiles.length==0 || services.length == 0){
      console.log("Invalid JSON input")
      return NextResponse.json({message:"Invalid JSON input"},{status:401})
    }

    const createdServices = [];
    const createdProfiles =[]

    for (let i = 0; i < services.length; i++) {
      
      const profile = profiles[i]
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(profile.password,salt)
      const phoneNumber= {
            code:"+234",
            num:generatePhoneNumber(),
      }
      const newProfile = await Profile.create({ ...profile ,phoneNumber,password:hashedPassword})
      createdProfiles.push(newProfile);

      const serviceData = { ...services[i], serviceProvider: newProfile._id};
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