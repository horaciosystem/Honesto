import RoundedImage from "@/common/RoundedImage"
import useUsers from "@/common/hooks/useUsers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FeedbackQuestions from "./FeedbackQuestions"
import GiveFeedbackButton from "./GiveFeedbackButton"

function ShareFeedBack({ users: initialData }) {
  const { data: users, error } = useUsers({ initialData })
  const router = useRouter()
  const { userId } = router.query
  const [view, setView] = useState()

  useEffect(() => {
    setView(userId ? "details" : "list")
  }, [userId])

  const onGiveFeedbackClick = (id) => {
    router.push({
      pathname: router.route,
      query: { userId: id },
    })
    setView("details")
  }

  const onBack = () => {
    router.push({
      pathname: router.route,
      query: {},
    })
    setView("list")
  }

  return (
    <div className="mt-10">
      <div hidden={view !== "details"}>
        <button onClick={onBack} className="flex items-center py-4">
          <Icon className="w-5 h-4 mr-1" />
          <span className="uppercase text-sm">Back</span>
        </button>
        {view === "details" && <FeedbackQuestions userId={userId} />}
      </div>
      <div hidden={view !== "list"}>
        <div className="mt-12 mb-4">
          <ListHeader />
        </div>
        {!error && !users && <span>Loading...</span>}
        <ul className="shadow">
          {users?.map((user) => (
            <li
              key={user.id}
              className="flex items-center space-x-3 px-4 py-5 focus-within:bg-purple-100 
              group hover:bg-purple-100 border-b-2 border-gray-100 last:borer-none"
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
    </div>
  )
}

function ListHeader() {
  return (
    <div className="flex">
      <h1 className="font-semibold text-3xl">Share Feedback</h1>
    </div>
  )
}

export default ShareFeedBack

const Icon = ({ className }) => (
  <svg viewBox="0 0 12 18" className={className}>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(-12 -93)">
        <g transform="translate(0 84)">
          <g transform="matrix(-1 0 0 1 36 0)">
            <polygon points="0 0 36 0 36 36 0 36" />
            <polygon
              fill="currentColor"
              fillRule="nonzero"
              points="15 9 12.885 11.115 19.755 18 12.885 24.885 15 27 24 18"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)
