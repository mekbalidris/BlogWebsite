import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();

export async function GET(request) {
    return NextResponse.json({ msg: "API Working" });
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();
        
        const image = formData.get('image');
        
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `./public/${timestamp}_${image.name}`;
        
        await writeFile(path, buffer);
        const imageUrl = `/${timestamp}_${image.name}`;

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imageUrl}`,
            authorImg: `${formData.get('authorImg')}`
        }

        await BlogModel.create(blogData)
        
        return NextResponse.json({ success: true, msg:"Blog Added" }, { status: 201 });
    } catch (error) {
        console.error("Error processing upload:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}