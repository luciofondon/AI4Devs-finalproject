import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PupitreStatus } from '../../components/PupitreStatus/PupitreStatus';
import { devicesService } from '../../services/devices';
import { EmptyState } from '../../components/EmptyState/EmptyState';

export const PupitresPage = () => {
  const { data: pupitres, isLoading, error } = useQuery({
    queryKey: ['pupitres'],
    queryFn: devicesService.getPupitres,
  });

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error al cargar los pupitres: {error instanceof Error ? error.message : 'Error desconocido'}
      </Alert>
    );
  }

  if (!pupitres || pupitres.length === 0) {
    return (
      <EmptyState
        title="No hay pupitres disponibles"
        message="No se encontraron pupitres en el sistema. Por favor, intente más tarde."
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pupitres
      </Typography>
      <Grid container spacing={2}>
        {pupitres.map((pupitre) => (
          <Box key={pupitre.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1 }}>
            <PupitreStatus pupitre={pupitre} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}; 