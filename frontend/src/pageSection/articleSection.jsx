import React, { useEffect, useState } from "react";
import BlogCard from "../component/blogCard.jsx";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Article() {
  const [isUser, setisUser] = useState({});
  const { user } = useAuthContext();
  const [articles, setArticles] = useState([]);

  // Mengambil data artikel dan informasi pengguna saat komponen dimuat atau ketika objek user berubah.
  useEffect(() => {
    axios
      .get(`http://localhost:5000/article`)
      .then((response) => {
        setArticles(response.data.data);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
      });

    if (user && user.token) {
      const decoded = jwtDecode(user.token);
      axios
        .get(`http://localhost:5000/user/${decoded._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setisUser(response.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col px-[7%]">
      <h1 className="py-10 text-xl font-extrabold text-center text-primary xl:pt-20 lg:mb-5 lg:pt-10 lg:pb-0 md:text-2xl">
        Article
      </h1>
      <div className="flex flex-col">
        <a href="/articles" className="flex justify-end pb-2 text-primary">
          Lihat Semua
        </a>
        <div className="flex flex-col gap-5 lg:flex-row lg:justify-center lg:gap-4 xl:gap-5">
          {articles.map((item) => (
            <BlogCard key={item._id} article={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
