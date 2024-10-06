import React, { useEffect, useState } from "react";

import apiClient from "@/api/api-client";
import { Hero } from "@/api/requests/hero-realms/hero/hero.interface";
import Card from "@/components/hero-card/card";

const AllHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await apiClient.hero.getHeroes();
      setHeroes(data);
      console.log(data);
    };

    fetch();
  }, []);

  if (!heroes) {
    return;
  }

  return (
    <div className="flex justify-center p-5">
      <div className="grid grid-cols-5 gap-10">
        {heroes
          .filter(({ battlefieldId }) => !battlefieldId)
          .map((hero) => (
            <Card key={hero.id} hero={hero} />
          ))}
      </div>
    </div>
  );
};

export default AllHeroes;
