import { Button } from "@/components/ui/button.tsx";

interface EventSidebarProps {
  headerImageUrl?: string;
  place?: string;
  namePub?: string;
  description?: string;
  dateFrom?: string;
  dateTo?: string;
}

export function EventSidebar({
  headerImageUrl,
  place,
  namePub,
  description,
  dateFrom,
  dateTo,
}: Readonly<EventSidebarProps>) {
  const formatDateForGoogleCalendar = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  const generateGoogleCalendarUrl = () => {
    if (!dateFrom || !dateTo) return;

    const formattedDateFrom = formatDateForGoogleCalendar(dateFrom);
    const formattedDateTo = formatDateForGoogleCalendar(dateTo);
    const eventName = encodeURIComponent(namePub ?? "Event");
    const eventDescription = encodeURIComponent(
      description ?? "No description available"
    );
    const eventLocation = encodeURIComponent(place ?? "No location specified");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${formattedDateFrom}/${formattedDateTo}&details=${eventDescription}&location=${eventLocation}`;
  };

  return (
    <aside className="w-full md:max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
      <div className="w-full bg-zinc-100 rounded-md overflow-hidden">
        {headerImageUrl && (
          <img
            src={headerImageUrl}
            alt={place}
            className="w-full h-auto object-cover"
          />
        )}
      </div>
      <h1 className="text-xl text-zinc-900 font-semibold">{namePub}</h1>
      <p className="text-sm text-zinc-500">{description}</p>
      <Button
        variant="secondary"
        className="bg-blue-100"
        onClick={() => window.open(generateGoogleCalendarUrl(), "_blank")}
        disabled={!dateFrom || !dateTo}>
        Add to calendar
      </Button>
    </aside>
  );
}
