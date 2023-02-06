type Props = {
  params: {
    organization: string
  }
}

export default async function LandingPage({ params }: Props) {
  return (
    <span>
      Landing page for <b>{params.organization}</b>
    </span>
  )
}
