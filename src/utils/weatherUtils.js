export const convertCode = (code, state) => {
    const codes = {
        0: ['Clear sky', 'clear-sky-sun.png'],
        1: ['Mainly clear', 'clear-sky-sun.png'],
        2: ['Partly cloudy', 'partly-cloudy.png'],
        3: ['Overcast', 'overcast.png'],
        45: ['Fog', 'fog.png'],
        48: ['Rime fog', 'fog.png'],
        51: ['Light drizzle', 'rainy.png'],
        53: ['Moderate drizzle', 'drizzle.png'],
        55: ['Dense intensity drizzle', 'intensive-drizzle.png'],
        56: ['Light freezing drizzle', 'freezing-rain-shower.png'],
        57: ['Intensive freezing drizzle', 'freezing-rain-shower.png'],
        61: ['Slight rain', 'rainy.png'],
        63: ['Moderate rain', 'drizzle.png'],
        65: ['Heavy rain', 'intensive-drizzle.png'],
        66: ['Light freezing rain', 'freezing-rain-shower.png'],
        67: ['Intensive freezing rain', 'freezing-rain-shower.png'],
        71: ['Slight snow fall', 'snow.png'],
        73: ['Moderate snow fall', 'snow.png'],
        75: ['Intensive snow fall', 'snow.png'],
        77: ['Snow grains', 'snow.png'],
        80: ['Slight rain shower', 'rain-shower.png'],
        81: ['Moderate rain shower', 'rain-shower.png'],
        82: ['Violent rain shower', 'rain-shower.png'],
        85: ['Slight snow shower', 'snow.png'],
        86: ['Heavy snow shower', 'snow.png'],
        95: ['Slight thunderstorm', 'storm.png'],
        96: ['Thunderstorm with hail', 'intensive-storm.png'],
        97: ['Thunderstorm with hail', 'intensive-storm.png'],
    }
    if(state === 0) return codes[code];
    else if(state === 1) return codes[code][0];
    return codes[code][1]
}

export const dateBuilder = (fullDate, code) => {
    const months = [
        ['Jan', 'january'],
        ['Feb', 'february'],
        ['Mar', 'march'],
        ['Apr', 'april'],
        ['May', 'may'],
        ['Jun','june'],
        ['Jul', 'july'],
        ['Aug', 'august'],
        ['Sep', 'september'],
        ['Oct', 'october'],
        ['Nov', 'november'],
        ['Dec', 'december'],
    ];
    const days = [
        ['Sun', 'sunday'],
        ['Mon', 'monday'],
        ['Tue', 'tuesday'],
        ['Wed', 'wednesday'],
        ['Thur', 'thursday'],
        ['Fri', 'friday'],
        ['Sat', 'saturday'],
    ];

    const date = fullDate.split('-')
    const month = months[date[1] - 1][code];
    const year = date[0];
    const monthDay = Number(date[2]);
    const day = days[new Date(`${month} ${monthDay}, ${year}`).getDay()][code]
    return [day, `${monthDay} ${month}`, monthDay, month]
}

