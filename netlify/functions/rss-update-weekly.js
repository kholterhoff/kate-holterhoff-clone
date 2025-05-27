exports.handler = async (event, context) => {
  console.log('Weekly RSS update triggered at:', new Date().toISOString())

  try {
    // Get the site URL from Netlify environment
    const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://same-4qazo8e4n0j-latest.netlify.app'

    // Call our RSS update API endpoint
    const response = await fetch(`${siteUrl}/api/rss-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Netlify-Function-Weekly-RSS-Update'
      }
    })

    const result = await response.json()

    if (result.success) {
      console.log('RSS update successful:', {
        postCount: result.postCount,
        message: result.message,
        timestamp: new Date().toISOString()
      })

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'RSS update completed successfully',
          data: result,
          timestamp: new Date().toISOString()
        })
      }
    } else {
      console.error('RSS update failed:', result)

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'RSS update failed',
          error: result.message || 'Unknown error',
          timestamp: new Date().toISOString()
        })
      }
    }

  } catch (error) {
    console.error('Weekly RSS update error:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Weekly RSS update failed',
        error: error.message || 'Unknown error',
        timestamp: new Date().toISOString()
      })
    }
  }
}
