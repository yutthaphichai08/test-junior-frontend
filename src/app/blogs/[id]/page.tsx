"use client";

import User from "@/service/api/User";
import { useEffect, useState } from "react";

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
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="display-4">{detail?.name ?? "Default Name"}</h1>
            <p className="lead">
              {detail?.description ?? "Default description."}
            </p>
          </div>
          <div className="col-md-6">
            <div className="card">
              <img
                src={detail?.image ?? ""}
                alt="description"
                className="card-img-top"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="card-body">
                <p
                  className="card-text text-justify"
                  style={{ lineHeight: "1.6   " }}
                >
                  <b>นครปฐม</b> เป็นจังหวัดหนึ่งในภาคกลางของประเทศไทย
                  เป็นหนึ่งในห้าจังหวัดที่อยู่ในพื้นที่ปริมณฑลของกรุงเทพมหานคร
                  จังหวัดนี้มีประวัติศาสตร์เก่าแก่ยาวนาน
                  เชื่อว่าเป็นที่ตั้งเก่าแก่ของเมืองในสมัยทวารวดี
                  โดยมีหลักฐานทางประวัติศาสตร์และโบราณคดีเป็นจำนวนมาก
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
