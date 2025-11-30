import React from "react";
import { Progress } from "antd";

const Analytics = ({ AllTransection }) => {
  //category
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  //total transection
  const totalTransection = AllTransection.length;
  const totalIncomeTransections = AllTransection.filter(
    (transection) => transection.type === "income"
  );
  const totalExpenceTransections = AllTransection.filter(
    (transection) => transection.type === "expence"
  );
  const totalIncomePercent =
    (totalIncomeTransections.length / totalTransection) * 100;
  const totalExpencePercent =
    (totalExpenceTransections.length / totalTransection) * 100;

  //total turn over
  const totalTurnover = AllTransection.reduce(
    (acc, transection) => acc + transection.amount,
    0
  );
  const totalIncomeTurnover = AllTransection.filter(
    (transection) => transection.type === "income"
  ).reduce((acc, transection) => acc + transection.amount, 0);

  const totalExpenceTurnover = AllTransection.filter(
    (transection) => transection.type === "expence"
  ).reduce((acc, transection) => acc + transection.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenceTurnoverPercent =
    (totalExpenceTurnover / totalTurnover) * 100;
  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total transection: {totalTransection}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransections.length}
              </h5>
              <h5 className="text-danger">
                Expence: {totalExpenceTransections.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpencePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expence: {totalExpenceTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenceTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <h4>Categorywise income</h4>
          {categories.map((category) => {
            const amount = AllTransection.filter(
              (transection) =>
                transection.type === "income" &&
                transection.category === category
            ).reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Categorywise Expence</h4>
          {categories.map((category) => {
            const amount = AllTransection.filter(
              (transection) =>
                transection.type === "expence" &&
                transection.category === category
            ).reduce((acc, transection) => acc + transection.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenceTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
