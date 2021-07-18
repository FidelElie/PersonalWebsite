type skillProps = {
    title: string,
    icon: string,
    tags: string[],
    more?: boolean
}

const skillData: skillProps[] = [
    {
        title: "Python",
        icon: "fab fa-python",
        tags: ["Django", "Numpy", "Scipy", "Matplotlib", "Pandas"],
        more: true
    },
    {
        title: "JS / TS",
        icon: "fab fa-js-square",
        tags: ["Vanilla", "React", "React Native", "Nextjs", "Jquery"]
    },
    {
        title: "CSS",
        icon: "fab fa-css3",
        tags: ["Vanilla", "SASS", "TailwindCSS", "Bootstrap"]
    },
    {
        title: "Databases",
        icon: "fas fa-database",
        tags: ["SQLite", "PostgreSQL", "Firestore", "DynamoDB"]
    },
    {
        title: "Development",
        icon: "fas fa-layer-group",
        tags: ["Git", "Webpack", "Heroku", "Digital Ocean", "AWS"]
    },
    {
        title: "Creative",
        icon: "fas fa-image",
        tags: ["Premiere Pro", "Illustrator", "Lightroom"],
        more: true
    },
    {
        title: "Other",
        icon: "fas fa-thumbs-up",
        tags: ["Android", "YouTube v3 API", "MS Office", "Latex"]
    },
    {
        title: "Social",
        icon: "fas fa-comments",
        tags: ["Team Player", "Public-Speaking", "Helpful"],
        more: true
    }
]

export default skillData;
export type { skillProps };
