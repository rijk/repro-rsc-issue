import RequestAccessDialog from '../account/RequestAccess'

export default function RequestAccessPage() {
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-accent">
        <img
          src="https://assets.website-files.com/62fa3218ab507643b9e13e6e/62fa3218ab50763ee6e13ef5_hero-img.jpg"
          loading="lazy"
          srcSet="https://assets.website-files.com/62fa3218ab507643b9e13e6e/62fa3218ab50763ee6e13ef5_hero-img-p-500.jpeg 500w, https://assets.website-files.com/62fa3218ab507643b9e13e6e/62fa3218ab50763ee6e13ef5_hero-img-p-800.jpeg 800w, https://assets.website-files.com/62fa3218ab507643b9e13e6e/62fa3218ab50763ee6e13ef5_hero-img-p-1080.jpeg 1080w, https://assets.website-files.com/62fa3218ab507643b9e13e6e/62fa3218ab50763ee6e13ef5_hero-img.jpg 3330w"
          sizes="60vw"
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        />
        <div className="fixed inset-0 bg-gradient-to-r from-accent to-accent/60"></div>
      </div>
      <RequestAccessDialog open={true} />
    </div>
  )
}
