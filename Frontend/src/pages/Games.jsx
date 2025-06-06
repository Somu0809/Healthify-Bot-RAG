import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const gamesList = [
    { name: "Hang Man", path: "/Hang-Man", img: "https://mir-s3-cdn-cf.behance.net/projects/404/db9e21195320515.Y3JvcCw1NzUzLDQ1MDAsMTEyNSww.jpg" },
    { name: "Soothing Soundboard", path: "/Sound-board", img: "https://images.unsplash.com/photo-1506704888326-3b8834edb40a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c291bmR8ZW58MHx8MHx8fDA%3D" },
    { name: "Color & Relax", path: "/Calm-Coloring", img: "https://static.vecteezy.com/system/resources/thumbnails/023/294/542/small_2x/relax-cute-hand-drawn-coloring-pages-for-kids-and-adults-motivational-quotes-text-beautiful-drawings-for-girls-with-patterns-details-coloring-book-with-flowers-and-tropical-plants-vector.jpg" },
    { name: "Mindful Breathing", path: "/Breathing", img: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/05/breathing-exercise-1620577374.jpg" },
    { name: "Memory Match", path: "/Memory-Match", img: "https://img.freepik.com/free-vector/hand-drawn-memory-game-card_23-2150138543.jpg" },
    { name: "2048", path: "/2048", img: "https://images.crazygames.com/qube-2048-elf_16x9/20241203035143/qube-2048-elf_16x9-cover?auto=format,compress&q=75&cs=strip" },
];

const GameItem = ({ name, path, img, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
        }}
        className="w-full"
    >
        <Link to={path} className="block">
            <motion.div
                whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-2xl p-4 md:p-6 h-64 sm:h-72 md:h-80 flex flex-col items-center transition-all duration-300 border border-white/20"
            >
                <motion.div
                    className="w-full h-36 sm:h-40 md:h-48 mb-4 overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.img 
                        src={img} 
                        alt={name} 
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                </motion.div>
                <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                    {name}
                </motion.h3>
            </motion.div>
        </Link>
    </motion.div>
);

const Games = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900 py-10 sm:py-12 md:py-16 px-4 sm:px-6"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="max-w-7xl mx-auto"
            >
                <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-4 leading-relaxed py-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Relax & Play
                </motion.h2>
                <motion.p
                    className="text-lg sm:text-xl text-gray-600 text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Explore our collection of mindful games designed to help you relax and destress
                </motion.p>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {gamesList.map((game, index) => (
                        <GameItem 
                            key={index} 
                            {...game} 
                            index={index} 
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Games;