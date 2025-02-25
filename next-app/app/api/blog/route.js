import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
const fs = require('fs')


const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();


// API Endpoint to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id")
    if(blogId){
        const blog = await BlogModel.findById(blogId)
        return NextResponse.json(blog)
    }else{
        const blogs = await BlogModel.find({})
        return NextResponse.json({ blogs });
    }

}


// API Endpoint for Uploading Blogs
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
            image: `${imageUrl}`,
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            authorImg: `${formData.get('authorImg')}`
        }

        await BlogModel.create(blogData)
        
        return NextResponse.json({ success: true, msg:"Blog Added" }, { status: 201 });
    } catch (error) {
        console.error("Error processing upload:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


// Creating API Endpoint to delete Blog

export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id')
    const blog = await BlogModel.findById(id)
    fs.unlink(`./public${blog.image}`,()=>{})
    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({msg:"Blog Deleted"})
}