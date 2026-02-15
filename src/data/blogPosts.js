import manifest from '../lib/media/manifest.json';

const blogMain = manifest['blog-hero'];
const choirImg = manifest['choir-hero'];
const podcastImg = manifest['podcast-hero'];
// Reuse the same assets for small versions
const blogSmall = manifest['blog-hero'];
const choirSmall = manifest['choir-hero'];

export const POSTS = [
    {
        id: 1,
        title: "Echoes from the Past: The Making of Our New Album",
        excerpt: "Journey with us as we explore the ancient acoustics that inspired our latest collection of polyphonic arrangements.",
        category: "Behind the Scenes",
        image: choirImg,
        date: "Dec 15, 2024",
        readTime: "5 min read",
        author: {
            name: "Sarah Jenkins",
            initials: "SJ",
            avatarColor: "#a89080",
            instagram: "https://instagram.com/sarahjenkins",
            twitter: "https://twitter.com/sarahjenkins"
        }
    },
    {
        id: 2,
        title: "The Science of Harmony: Why We Love Chords",
        excerpt: "A deep dive into the psychoacoustics of harmony and why certain chord progressions trigger such powerful emotional responses.",
        category: "Music Theory",
        image: podcastImg,
        date: "Dec 02, 2024",
        readTime: "8 min read",
        author: {
            name: "Dr. Alan Grant",
            initials: "AG",
            avatarColor: "#8a9ba8",
            instagram: "https://instagram.com/alangrant",
            twitter: "https://twitter.com/alangrant"
        }
    },
    {
        id: 3,
        title: "Vocal Health 101 for Touring Choirs",
        excerpt: "Essential tips and warm-up routines that keep our voices crystal clear during our intense touring schedule.",
        category: "Education",
        image: blogSmall,
        date: "Nov 28, 2024",
        readTime: "4 min read",
        author: {
            name: "Elena Fisher",
            initials: "EF",
            avatarColor: "#b4a89a",
            instagram: "https://instagram.com/elenafisher",
            twitter: "https://twitter.com/elenafisher"
        }
    },
    {
        id: 4,
        title: "Interview: The Future of Choral Music",
        excerpt: "We sat down with contemporary composer Eric Whitacre to discuss where choral music is heading in the digital age.",
        category: "Interviews",
        image: choirSmall,
        date: "Nov 15, 2024",
        readTime: "12 min read",
        author: {
            name: "Genesi Team",
            initials: "GT",
            avatarColor: "#9a8a7a",
            instagram: "https://instagram.com/genesinovachoir",
            twitter: "https://twitter.com/genesinovachoir"
        }
    }
];
