import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapLibreFloorMap, indoorRooms, CITY_HALL_NAME } from '@/components/maplibre-floor-map';
import { getOffice, seedOffices, seedFloors } from '@/lib/mock-data';
import { Building2, MapPin, Navigation, Layers3 } from 'lucide-react';

export default function FloorMaps() {
  const [selectedFloor, setSelectedFloor] = useState(seedFloors[0]?.floor_number ?? 1);
  const [selectedOfficeId, setSelectedOfficeId] = useState(seedOffices[0].id);

  const floorOffices = useMemo(
    () => seedOffices.filter((office) => Number(office.floor) === selectedFloor),
    [selectedFloor],
  );

  const selectedOffice = useMemo(() => {
    const office = getOffice(selectedOfficeId);
    if (office && Number(office.floor) === selectedFloor) return office;
    return floorOffices[0] ?? seedOffices[0];
  }, [floorOffices, selectedFloor, selectedOfficeId]);

  const selectedFloorRecord = useMemo(
    () => seedFloors.find((f) => f.floor_number === selectedFloor),
    [selectedFloor],
  );

  const highlightRoomId = useMemo(() => {
    if (!selectedOffice) return undefined;
    return indoorRooms.find(
      (room) => room.floor === Number(selectedOffice.floor) && room.room === selectedOffice.room,
    )?.id;
  }, [selectedOffice]);

  return (
    <>
      <Head title="Floor Maps — DavaNav Admin" />
      <AdminShell
        title="Floor Maps"
        description="Inspect the interactive building floor plan and the offices available on each level."
        breadcrumbs={[{ label: 'Floor Maps' }]}
        actions={
          <Button variant="outline">
            <Layers3 className="mr-2 h-4 w-4" /> Floor Plan View
          </Button>
        }
      >
        <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base">Floors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {seedFloors.map((floor) => (
                <button
                  key={floor.floor_id}
                  type="button"
                  onClick={() => {
                    setSelectedFloor(floor.floor_number);
                    const firstOffice = seedOffices.find(
                      (office) => Number(office.floor) === floor.floor_number,
                    );
                    if (firstOffice) setSelectedOfficeId(firstOffice.id);
                  }}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    selectedFloor === floor.floor_number
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold">Floor {floor.floor_number}</div>
                      <div className="text-xs text-gray-500">
                        {floor.floor_name ?? `Floor ${floor.floor_number}`}
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {
                        seedOffices.filter(
                          (office) => Number(office.floor) === floor.floor_number,
                        ).length
                      }{' '}
                      offices
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="grid gap-4 p-4 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                    <Building2 className="h-4 w-4" /> {CITY_HALL_NAME}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Floor {selectedFloor}
                    {selectedFloorRecord?.floor_name ? ` — ${selectedFloorRecord.floor_name}` : ''}
                  </h2>
                  <p className="text-sm text-gray-500">
                    The map below mirrors the kiosk experience so staff can review office placement and room highlights for the selected level.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Navigation className="h-4 w-4 text-blue-600" /> Selected office
                  </div>
                  <div className="mt-2 font-medium text-gray-900">{selectedOffice?.name}</div>
                  <div className="text-xs text-gray-500">{selectedOffice?.room} • Floor {selectedOffice?.floor}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-gray-50/70">
                <CardTitle className="text-base">Interactive map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid gap-0 lg:grid-cols-[1.15fr_0.45fr]">
                  <div className="min-h-[480px] border-b lg:border-b-0 lg:border-r">
                    <MapLibreFloorMap
                      floor={selectedFloor}
                      highlightId={highlightRoomId}
                      // NOTE: `floor_map` (seedFloorRecord?.floor_map) holds the uploaded
                      // floor-plan image path per the data dictionary. MapLibreFloorMap
                      // currently renders a vector layer keyed by `floor` number only.
                      // If/when that component supports a raster background or custom
                      // style URL, pass it here, e.g.:
                      //   backgroundImage={selectedFloorRecord?.floor_map ?? undefined}
                      onSelect={(roomId) => {
                        const room = indoorRooms.find((item) => item.id === roomId);
                        if (!room) return;
                        const matched = seedOffices.find(
                          (office) => Number(office.floor) === room.floor && office.room === room.room,
                        );
                        if (matched) {
                          setSelectedFloor(Number(matched.floor));
                          setSelectedOfficeId(matched.id);
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Offices on this floor</div>
                      <div className="mt-2 space-y-2">
                        {floorOffices.map((office) => {
                          const active = selectedOffice?.id === office.id;
                          return (
                            <button
                              key={office.id}
                              type="button"
                              onClick={() => setSelectedOfficeId(office.id)}
                              className={`w-full rounded-lg border p-3 text-left transition ${
                                active ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">{office.name}</div>
                                  <div className="text-xs text-gray-500">{office.room}</div>
                                </div>
                                <MapPin className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedOffice && (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                        <div className="text-sm font-semibold text-gray-900">{selectedOffice.name}</div>
                        <div className="mt-1 text-sm text-gray-600">{selectedOffice.description}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="outline">{selectedOffice.room}</Badge>
                          <Badge variant="outline">{selectedOffice.hours}</Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminShell>
    </>
  );
}