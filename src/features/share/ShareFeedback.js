import RoundedImage from "@/common/RoundedImage";
import useUsers from "@/common/hooks/useUsers";
import { useRouter } from "next/router";
import { useState } from "react";
import FeedbackQuestions from "./FeedbackQuestions";
import GiveFeedbackButton from "./GiveFeedbackButton";

function ShareFeedBack() {
  const { data: users } = useUsers();
  const router = useRouter();
  const { userId } = router.query;
  const [view, setView] = useState(userId ? "details" : "list");

  const onGiveFeedbackClick = (id) => {
    router.push({
      pathname: router.route,
      query: { userId: id },
      shallow: true,
    });
    setView("details");
  };

  return (
    <>
      {view === "details" ? (
        <FeedbackQuestions userId={userId} />
      ) : (
        <div hidden={view !== "list"}>
          <div className="mt-12 mb-4">
            <ListHeader />
          </div>
          {!users && <span>Loading...</span>}
          <ul className="shadow">
            {users?.map((user) => (
              <li
                key={user.id}
                className="flex items-center space-x-3 px-4 py-5 focus-within:bg-indigo-100 group hover:bg-indigo-100 border-b-2 border-gray-100 last:borer-none"
              >
                <div className="flex-grow-0">
                  <RoundedImage
                    src={user.avatar}
                    alt={`${user.firstName}'s avatar`}
                    placeholder="/default-profile.svg"
                  />
                </div>
                <div className="flex-grow-2">{`${user.firstName} ${user.lastName}`}</div>
                <div className="flex-grow-0">
                  <GiveFeedbackButton
                    userId={user.id}
                    onClick={() => onGiveFeedbackClick(user.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function ListHeader() {
  return (
    <div className="flex">
      <h1 className="font-semibold text-3xl">Share Feedback</h1>
    </div>
  );
}

export default ShareFeedBack;
