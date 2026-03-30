const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="py-4 text-center">
      <p className="text-sm text-gray-600">© {currentYear} Kate Holterhoff</p>
    </div>
  )
}

export default Footer
