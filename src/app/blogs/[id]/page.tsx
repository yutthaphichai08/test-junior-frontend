"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";

interface IDetail {
  id: number;
  name: string;
  description: string;
  image: string;
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
    <div
      className="container "
      style={{ marginTop: "80px", minHeight: "90vh" }}
    >
      {detail ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={detail.image}
              alt={detail.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-3">{detail.name}</h1>
            <p>{detail.description}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
