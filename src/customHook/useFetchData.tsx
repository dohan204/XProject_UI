import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"

export const useFetchData = <T = any>(url?: string | null) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await axios.get<T>(url, {
          signal: controller.signal
        })
        setData(res.data)
      } catch (err) {
        if (axios.isCancel(err)) return

        if (err instanceof AxiosError) {
          const status = err.response?.status

          if (!err.response) {
            setError("Không thể kết nối server")
          } else if (status === 404) {
            setError("Không tìm thấy dữ liệu")
          } else if (status === 401) {
            setError("Chưa đăng nhập")
          } else if (status === 403) {
            setError("Không có quyền truy cập")
          } else if (status === 500) {
            setError("Lỗi hệ thống")
          } else {
            setError(err.response.data?.message || err.message)
          }
        } else {
          setError("Lỗi không xác định")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
