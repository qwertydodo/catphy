type PageMetaProps = {
  title: string
  description: string
}

export const PageMeta = ({ title, description }: PageMetaProps) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
  </>
)
