import { BarChart, Bar, Tooltip, XAxis, YAxis } from 'recharts'

type Props = {
  data: { date: string; scanCount: number }[]
}

const IBarChart: React.FC<Props> = ({ data }) => {
  return (
    <BarChart width={400} height={350} data={data} barSize={29}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  )
}

export default IBarChart;