export function Tooltip({ series, seriesIndex, dataPointIndex, w }) {
    const quantity = series[seriesIndex][dataPointIndex]
    const category = w.globals.labels[dataPointIndex]
    return `<Card class="p-2">
            <CardHeader class="">
                <p class="font-bold" >${category}</p>
            </CardHeader>
            <CardBody class="text-sm">
                <p class="" >Quantity: ${quantity}</p>
            </CardBody>
            </Card>`;
}

