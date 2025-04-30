import axios from "axios";
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://shadowmanga.uz";

async function generateSitemap() {
    try {
        const { data } = await axios.get(`https://gateway.shadowmanga.uz/hotel?limit=1000`);
        const hotels = data.data.hotels || [];

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${BASE_URL}/about</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${BASE_URL}/faq</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${BASE_URL}/search</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${BASE_URL}/blog</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>${BASE_URL}/blog/sample-post</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.6</priority>
    </url>
    <url>
        <loc>${BASE_URL}/terms</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${BASE_URL}/contact</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${BASE_URL}/advertise</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${BASE_URL}/list-property</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
    </url>`;

        hotels.forEach((hotel) => {
            const hotelUrl = hotel.partner === "member" ? `https://shadowmanga.uz/hotels/${hotel.abbrivation}` : `https://shadowmanga.uz/hotels/${hotel.id}`;
            sitemap += `
    <url>
        <loc>${hotelUrl}</loc>
        <lastmod>${new Date(hotel.updated_at || hotel.created_at || new Date()).toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`;
        });

        sitemap += `
</urlset>`;

        writeFileSync(resolve(process.cwd(), "./public/sitemap.xml"), sitemap);
        console.log("Done!");
    } catch (error) {
        console.error(error);
    }
}

generateSitemap();
