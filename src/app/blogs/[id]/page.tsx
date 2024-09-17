"use client";

import { useEffect, useState } from "react";
import User from "@/service/api/User";
import LoadingSpinner from "@/app/components/LoadingSpinner";

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
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container " style={{ minHeight: "100vh" }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img
              src={detail?.image}
              alt={detail?.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h1 className="mb-3">{detail?.name}</h1>
            <p>{detail?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
