"use client";

import User from "@/service/api/User";
import { useEffect, useState } from "react";

interface IDetail {
  id: number;
  name: string;
  description: string;
}

export default function BlogDetail({
  params,
}: {
  params: { id: number | undefined };
}) {
  const paramId = params.id;
  const [detail, setDetail] = useState<IDetail | null>(null);

  useEffect(() => {
    if (paramId) {
      fetchData(paramId);
    }
  }, [paramId]);

  const fetchData = async (id: number | undefined) => {
    try {
      if (id) {
        const data = await User.getDetail(id);
        // console.log(data.data);
        setDetail(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{detail?.name}</h1>
      <p>{detail?.description}</p>
    </div>
  );
}
