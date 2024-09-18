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
    <div className="container" style={{ minHeight: "100vh" }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <div className="col-md-12 mb-4 d-flex justify-content-center">
            <img
              src={detail?.image}
              alt={detail?.name}
              className="img-fluid rounded"
              style={{
                maxWidth: "100%",
                width: "600px",
                height: "300px",
                maxHeight: "400px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <div style={{ maxWidth: "660px" }}>
              <h1 className="mb-3" style={{ textAlign: "center" }}>
                {detail?.name}
              </h1>
              <p>{detail?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
